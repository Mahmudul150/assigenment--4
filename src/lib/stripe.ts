import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.stripe_api_key)

export default stripe