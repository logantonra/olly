# ras-pi-dash

Dashboard for local train times. Hosted in AWS, but will run on a raspi on kiosk mode. TODO: full instructions in README.md

## TODO

**High Priority**

- [ ] Change location and stations to use user prefs from table
- [ ] Add page for users to manage their preferences (location, stations, etc.)

  - [ ] Clean up train line selection

- [ ] Update messages widget to pull from table

**Lower Priority**

- [ ] Refactor dashboard to not be editable- only via connected user account on website
- [ ] Make time update exactly at the minute
- [ ] Add testing with Jest
- [ ] Add server side caching to avoid rate limiting on weather and train APIs (can wait, only one customer at the moment)
- [ ] Add ci/cd with GitHub actions (can wait, only prod and local deployments at the moment)

  - currently only prod and local deployments to save on aws costs
  - Makefile based way to bring up / down a remote QA environment could be useful

- [ ] Add loading placeholders/ api error placeholders for train times and weather
- [ ] Fix all snow/ rain animations
- [ ] Make background dynamic based on real weather data
