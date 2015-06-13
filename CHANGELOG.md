# Change Log

All notable changes to this project will be documented in this file.

## [2.2.0] - 2015-06-13

### Added

- All events have `causedBy` property which is the body that caused the event.

## [2.1.0] - 2015-06-13

### Added

- All events have `count` property which is number of bodies currently overlapping the ghost.

## [2.0.1] - 2015-05-07

### Changed

- Module-internal data renamed to decrease chances of name clash with p2's or user's properties on body

## [2.0.0] - 2015-04-16

### Added

- ghost bodies now fire events: bodyEntered, populated, bodyExited, emptied

### Changed

- Requires p2 0.6.1 (was 0.6.0)

## [1.1.2] - 2015-01-30

### Added

- Added p2 0.6.0 to peerDependencies

## [1.1.1] - 2014-11-18

### Fixed

- Disable friction equations of contact events so ghost bodies truly don't affect other bodies

## [1.1.0] - 2014-11-18

### Changed

- `ghostify(body)` and `unghostify(body)` now return the body

## [1.0.0] - 2014-11-09
