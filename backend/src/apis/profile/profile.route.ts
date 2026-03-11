import {Router} from "express";
import {
	getFollowersByProfileIdController, getFollowingsByProfileIdController,
	getPublicProfileByProfileIdController,
	getPublicProfileByProfileNameController,
	putProfileController
} from "./profile.controller.ts";
import {isLoggedInController} from "../../utils/controllers/is-logged-in.controller.ts";

const basepath = '/apis/profile' as const
const router = Router()


router.route('/:id')
	.get(getPublicProfileByProfileIdController)
	.put(isLoggedInController, putProfileController)

router.route('/name/:name')
	.get(getPublicProfileByProfileNameController)
router.route('/names/:name')
	.get(getPublicProfileByProfileNameController)
router.route('/followers/:id')
	.get(getFollowersByProfileIdController)
router.route('/following/:id')
	.get(getFollowingsByProfileIdController)


export const profileRoute = { basepath, router }