import { testEnvironmentVariable } from '../settings';

export const tempHandlePage = (req, res) => res.status(200).json({ message: testEnvironmentVariable+" NEW DATA" });