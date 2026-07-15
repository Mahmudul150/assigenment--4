import { Request, Response } from "express"

export const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: "Route are not found...!",
        path: req.originalUrl,
        date: new Date()
    })
}