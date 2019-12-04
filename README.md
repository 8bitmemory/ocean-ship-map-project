# Ocean Ships Map
[![Ocean-Maps.png](https://i.postimg.cc/GhqZ1W0Y/Ocean-Maps.png)](https://postimg.cc/6y4Hr1p5)

This project maps ship longitude and latitude coordinates to a google map and represents ships with red lines. The ships can be filtered by their MMSI(Maritime Mobile Service Identity). You can submit an MMSI number and only that ship marker will appear. If none is specified, it will default to all MMSI showing at once.

## Installation for OceanShipBackend
Approach 1.
since the project dependencies are containerized you may just run the script below. Note: you need to install the OceanShipClient dependencies before dockerBoodstrap script can work properly.

```bash
./dockerBootstrap.sh
```
You may need to give the file execute permissions. To do so, run the command below.
```bash
chmod +x dockerBootstrap.sh

```
Approach 2.
If you do not want to use docker containers
```bash
pip install -r requirements.txt
```
You can run the API locally by running the commands below.
```bash
export FLASK_APP=index.py
flask run

```

## Installation for OceanShipClient
You will need to install the react project dependencies by running the command below inside this directory. The command requires you to have node and npm installed.

```bash
npm install
```
After the node_modules have been installed. You may run the dockerBootstrap.sh script to easily execute the front end and Back end.
```bash
./dockerBootstrap.sh
```

## Usage
You will need an ENVIRONMENT VARIABLE with your google maps API key. To learn how to get a google maps API key read 
[this.](https://developers.google.com/maps/documentation/javascript/get-api-key)
```.env
REACT_APP_GOOGLE_KEY='Your Google maps API key goes here'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)