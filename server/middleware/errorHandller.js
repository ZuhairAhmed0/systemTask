import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
  // Handle Prisma known request errors (constraint, foreign key, not found, ...)
  if (
    err &&
    (err instanceof Prisma.PrismaClientKnownRequestError ||
      err.name === "PrismaClientKnownRequestError")
  ) {
    switch (err.code) {
      // Unique constraint failed
      case "P2002":
        return res
          .status(409)
          .json({
            message: "Duplicate record",
            detail: err.meta ?? err.message,
          });
      // Record to update/delete does not exist
      case "P2025":
        return res.status(404).json({ message: "Record not found" });
      // Foreign key constraint failed
      case "P2003":
        return res
          .status(400)
          .json({ message: "Foreign key constraint failed" });
      default:
        return res.status(400).json({ message: err.message });
    }
  }

  // Validation errors from Prisma
  if (
    err &&
    (err.name === "PrismaClientValidationError" ||
      err instanceof Prisma.PrismaClientValidationError)
  ) {
    return res
      .status(400)
      .json({ message: "Validation error", detail: err.message });
  }

  // If a controller already set status, forward it
  if (err && err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // Fallback
  return res
    .status(500)
    .json({ message: err?.message ?? "Internal Server Error" });
};

export default errorHandler;
