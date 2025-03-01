import { workFlowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import {SERVER_URL} from "../config/env.js"

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.userId,
    });

   const {workFlowRunId} =  await workFlowClient.trigger({
      url : `${SERVER_URL}/api/v1/workflows/subscriptions/reminder`,
      body : {
        subscriptionId : subscription.id
      },
      headers: {
        'content-type' : 'application/json'
      },
      retries : 0
    })

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.Id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
