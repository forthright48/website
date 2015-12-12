# Change Log
All notable changes are documented here.

## TODO
- Edit mode in "Problem Setting" Page.
- Server side and front side form validation.
- logOut
- Show login success or failure notification
- Problem List is retrieved every time route changes. Use service to fix it.

## [0.0.6] - 2015-12-12
### Added
- Row edit form in Psetting table.
- freezeOnEdit filter.
- Support for Editing Problem in Psetting.
- Links to Problems in Psetting.
- Added LearnDev Section
- Retrieved LearnDev content from Github

## [0.0.5] - 2015-12-10
### Added
- New api to verify token /api/auth/verifyToken
- Verify loggedIn state at the beginning from API
- Added LogOut button and Logic

## [0.0.4] - 2015-12-09
### Refactor
- Make one component per file
- Used function declaration approach on AuthService and LoginCtrl.
### Added
- added sort function to grunt-injector
### Fixed
- jsonwebtoken didn't expire (jwt sign must be passed object as first parameter)
- circular dependency fix - AuthInterceptor doesn't depend of AuthService

## [0.0.3] - 2015-12-08
### Added
- Bower and Grunt for easier maintenance.
- grunt-wiredep to include scripts and css.
- Moved server related files into folder server
- Added grunt-injector to inject css and js files to home.html

## [0.0.2] - 2015-12-06
### Added
- Create service to handle storage of jwt in angular
- Added express-jwt module
- Added protection with jwt at /api/auth route.
- Added interceptors to attach token with requests.

## [0.0.1] - 2015-12-04
### Removed
- Planning.md
### Added
- Added jsonwebtoken module for node.
- Login API that sends token.
- Login page at /login.
- bcrypt hashing when registering.
- JWT token is sent when login api is hit.

## [0.0.0] - 2015-12-04
### Added
- Initial Code Base.
- READEME.md
- CHANGELOG.md
