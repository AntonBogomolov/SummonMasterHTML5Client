#include "CSummonMasterApp.h"

#include "novemberlib/utils/CLog.h"
#include "novemberlib/novemberlib.h"

#include "novemberlib/HTTPClient/CProxy.h"
#include "novemberlib/HTTPClient/CHTTPClient.h"
#include "CSummonMasterCommandManager.h"

#include "csitepage.h"
#include "cindexpage.h"
#include "csuccesspage.h"

CSummonMasterApp::CSummonMasterApp()
{
    CManagers::getInstance()->setCommandManager(new CSummonMasterCommandManager());
}

CSummonMasterApp::~CSummonMasterApp()
{
    delete CHTTPClient::getInstance();
}

void CSummonMasterApp::init()
{
	CFCGIApp::init();
	std::srand(unsigned(std::time(0)));

	CSessionManager*  sessionManager  = CManagers::getInstance()->getSessionManager();
	sessionManager->setIsNeedSessionCheck(true);
  
    CConfigHelper::getInstance();
	// Paths INIT
	CPathsHelper* paths = CPathsHelper::getInstance();
	// SITE CONTENT PATHS
	paths->addPath("css", "*/*", true);
	paths->addPath("fonts", "*/*", true);
	paths->addPath("img", "image/*", true);
	paths->addPath("archives", "*/*", true);
	paths->addPath("img/previewicons", "image/*", true);
	paths->addPath("img/controls", "image/*", true);
	paths->addPath("js", "text/javascript", true);
    paths->addPath("js/game", "text/javascript", true);
	paths->addPath("templates", "*/*", true);
	paths->addPath("", "image/vnd.microsoft.icon", true);

	CTemplateHelper* templates = CTemplateHelper::getInstance();
	const CPath* templatesDir = paths->getPath("templates");
	templates->loadTemplate(templatesDir, "header.html", "header");
	templates->loadTemplate(templatesDir, "footer.html", "footer");
	templates->loadTemplate(templatesDir, "content.html", "content");
   	templates->loadTemplate(templatesDir, "indexPage.html", "indexPage");
    templates->loadTemplate(templatesDir, "successPage.html", "successPage");
    
	CPageManager* pages = CManagers::getInstance()->getPageManager();
	pages->addPageType<CIndexPage>("index");
	pages->addPageType<CSuccessPage>("success");
	
	initDB();
     
}

void CSummonMasterApp::initDB()
{   
   
}
