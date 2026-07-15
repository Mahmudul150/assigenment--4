import cookieParser from 'cookie-parser'
import express, { Application, Request, Response } from 'express'
import cors from "cors";
import config from './config';
import { authRouter } from './modules/auth/auth.route';
import { categoryRouter } from './modules/category/category.router';
import { gearRouter } from './modules/gear/gear.router';
import { rentalRouter } from './modules/rental/rental.router';
import { providerRouter } from './modules/provider/provider.router';
import { reviewRouter } from './modules/review/review.router';
import { adminRouter } from './modules/admin/admin.router';
import { paymentRouter } from './modules/payment/payment.router';
import { notFound } from './utils/notFound';
// import { paymentRouter } from './modules/payment/payment.router';


const app:Application = express()

app.use(cors({
    origin:config.app_url,
    credentials:true
}))

app.use("/api/payments/confirm", express.raw({ type: 'application/json' }))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req : Request, res : Response) => {
    res.send("Hello, Meye!");
});

app.use('/api/auth',authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/gear',gearRouter)
app.use('/api/provider',providerRouter)
app.use('/api/rentals',rentalRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/admin', adminRouter)
app.use("/api/payments", paymentRouter);



app.use(notFound)



export default app