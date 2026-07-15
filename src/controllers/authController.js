import createHttpError from "http-errors";
import { createSession, setSessionCookies } from "../services/auth.js";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { USER_ROLE } from "../constants/users.js";
import { Request } from "../models/request.js";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs/promises";
import { sendEmail } from "../utils/sendEmail.js";
import handlebars from "handlebars";

//============== admin ==================

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const { sessionId } = req.cookies;

  const user = await User.findOne({ email, password });

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  if (user.role !== USER_ROLE.ADMIN) {
    throw createHttpError(403, "Admin access only");
  }

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json({ message: "Logged successfully" });
};

//============== user ======================

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, "Email in use");
  }

  const existingRequests = await Request.find({ email }).select("_id");
  const requestIds = existingRequests.map((request) => request._id);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    requests: requestIds,
  });
  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { sessionId } = req.cookies;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, "Invalid credentials");
  }

  const existingRequests = await Request.find({ email }).select("_id");

  const requestIds = existingRequests.map((request) => request._id);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $addToSet: {
        requests: {
          $each: requestIds,
        },
      },
    },
    { new: true },
  );

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);
  res.status(200).json(updatedUser);
};

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: "If this email exists, a reset link has been sent",
    });
  }

  const resetToken = jwt.sign(
    { sub: user._id, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  const templatePath = path.resolve("src/templates/reset-password-email.html");
  const templateSource = await fs.readFile(templatePath, "utf-8");

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Reset your password",
      html,
    });
  } catch {
    throw createHttpError(
      500,
      "Failed to send the email, please try again later.",
    );
  }

  res.status(200).json({
    message: "If this email exists, a reset link has been sent",
  });
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createHttpError(401, "Invalid or expired token");
  }

  const user = await User.findOne({ _id: payload.sub, email: payload.email });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ _id: user._id }, { password: hashedPassword });

  await Session.deleteMany({ userId: user._id });

  res.status(200).json({
    message: "Password reset successfully. Please log in again.",
  });
};

//================= both ======================

export const clearAuthCookies = (res) => {
  res.clearCookie("sessionId");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  clearAuthCookies(res);

  res.status(204).send();
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, "Missing session data");
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isExpired) {
    throw createHttpError(401, "Session token expired");
  }

  await Session.deleteOne({
    _id: sessionId,
    refreshToken,
  });

  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  res.status(200).json({
    message: "Session refreshed",
  });
};

export const getMe = (req, res) => {
  const { _id, name, email, role, favorites, requests } = req.user;
  const user = {
    _id,
    name,
    email,
    role,
    favorites,
    requests,
  };

  res.status(200).json(user);
};
