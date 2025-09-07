import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    console.log("Token is: ", token);
    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;