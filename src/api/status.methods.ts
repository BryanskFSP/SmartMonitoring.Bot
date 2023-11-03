import express, {Router} from "express";

export default function (context: Router) {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.json({
            success: true,
            message: "System ready",
        }).status(200);
    });

    context.use('/status', router);
}
