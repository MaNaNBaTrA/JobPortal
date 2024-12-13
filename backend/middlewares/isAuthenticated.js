import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
 
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    success: false,
                });
            }

            req.id = decoded.userId;

            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
        });
    }
};

export default isAuthenticated;
