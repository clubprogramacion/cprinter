<p align="center">
<a href="https://github.com/clubprogramacion/cprinter/"><img src="public/images/logo-preferente.svg" width="300" title="CPrinter" alt="CPrinter"></a>
</p>
<p align="center">Localhost printer of Programming Club</p>

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) (from NodeJS) to install CPrinter.

```bash
git clone https://github.com/clubprogramacion/cprinter.git
cd cprinter
npm install
```

## Configuration

For sure that CPrinter work correctly you need to add the `.env` file to the root project. Then, add the next variables.

```env
DOCS_TO_PRINT="docs_to_print"
PORT=3000
```

- DOCS_TO_PRINT: folder where save temporary the files to print..
- PORT: port where will be execute the server.

## Usage

Run the server with the command.

```bash
npm start
```

Then, for view the app page put the url local more the port in the navigator, for example: `192.168.0.1:3000`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
