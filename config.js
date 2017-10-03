/*
*	 project settings
*/
exports.USE_AUTORUN = false;

/*
*	 driver settings
*/
exports.WAITER_TIME = 10*1000;
exports.SAVE_TIME = 400;

/*
*	 Paths section
*/
exports.HOME_PAGE	= "https://test3.smashdocs.net" ;
exports.LOGIN_PAGE = exports.HOME_PAGE	+ "/login";
exports.MY_DOC_PAGE = exports.HOME_PAGE	+ "/documents/root";
exports.REGISTER_PAGE = exports.HOME_PAGE	+ "/register";
exports.DOCUMENT_PAGE = exports.HOME_PAGE	+ "/document/";
/*
*	 test constants
*/

// users credentials
exports.USER_NAME = "Andrii";
exports.USER_LAST_NAME = "Prykhodko";
exports.USER_COMPANY = "Smashdocs";
exports.EMAIL_DOMAIN = "@smashdocs.net"
exports.EMAIL_NAME = "andrii.prikhodko"
exports.USER_EMAIL_REGISTER = exports.EMAIL_NAME + "+999" + exports.EMAIL_DOMAIN;
exports.USER_PASSWORD = 'Tester_123';

exports.USER_EMAIL_LOGIN = exports.EMAIL_NAME + "+1" + exports.EMAIL_DOMAIN;

// document
exports.DOC_TYPES = ['Draft','Review'];
exports.FILE_PATH = "/workspace/autotests/provisions/files/Imported\ document.docx";
