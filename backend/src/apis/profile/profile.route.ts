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


router.route('/:profileId')
	.get(getPublicProfileByProfileIdController)
	.put(isLoggedInController, putProfileController)

router.route('/profileName/:profileName')
	.get(getPublicProfileByProfileNameController)
router.route('/profilesName/:profileName')
	.get(getPublicProfileByProfileNameController)
router.route('followers/:profileId')
	.get(getFollowersByProfileIdController)
router.route('/following/:profileId')
	.get(getFollowingsByProfileIdController)


export const profileRoute = { basepath, router }