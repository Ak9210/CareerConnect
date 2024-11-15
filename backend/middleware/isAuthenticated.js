import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;  // Ensure req.cookies exists
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId; // Use req.userId for consistency
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;