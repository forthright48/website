# Change Log
All notable changes are documented here.

## TODO
- Edit mode in "Problem Setting" Page.
- Server side and front side form validation.
- logOut
- Use Grunt to insert scripts and CSS
- One component per file

## [0.0.3] - 2015-12-08
## Added
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
