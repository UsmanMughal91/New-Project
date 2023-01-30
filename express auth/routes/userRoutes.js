import expree from 'express';
const router = expree.Router();  
import userController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth_middleware.js';


// route level middleware - to protect route
// router.use('/changUserPassword',checkUserAuth)
router.use('/loggedUser', checkUserAuth)

//public routes
router.post('/register',userController.userRegistration)
router.post('/login', userController.userLogin)
router.post('/send-user-password-reset-email', userController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',userController.userPasswordReset)
//protected routes

router.post('/changUserPassword', userController.changeUserPassword)
router.get('/loggedUser', userController.loggedUser)
router.post('/loadservices', userController.loadservices)
router.post('/booking', userController.booking)
router.post('/loadRequests', userController.loadRequests)
router.post('/loadprofile', userController.loadprofile)
router.post('/updateprofile', userController.updateprofile)
router.post('/payment', userController.payment)
router.post('/loaduser', userController.loaduser)



export default router