

# Запуск приложения: 
	`npm run json`
	`npm start`

### Нужно сначала скачать админку на свой компьютер

### На компьютере должны быть актульные версии node и npm 
Проверит: 
`node -v`
`npm -v`

### Далее, когда npm установлен, на компьютере выполнить команду: 
`npm install -g copy-files-from-to` - этот модуль следует установить из любой папки. он нужен для дальнейшей команды `deploy`

# Запуск приложения:
1. Выполнить `npm run json` для доступа к админке (доступ у данным)
2. Выполнить `npm start` для запуска админки

### можно работать.

### Во время работы в папке `public/images` должны быть все используемые картинки

## В админке созданы одиночные страницы (Главная, Контакты) и страницы-категории(Ремонт компьютеров, мониторов, ноутбуков)
1. Каждую страницу можно наполнять контентом. 
2. На каждой  странице-категории можно создавать страницы, давать им название ссылку, контент 


### Когда админка наполнена ее данные следует разместить на гитхаб: 
1. Остановить `npm run json` и `npm start`
2. Выполнить `npm run deploy -- "Message of the commit"` (где `"Message of the commit"` - сообщение для git commit)- команда копирует данные (`src/data/database.json`) и картинки (`public/images/*`) в папку `api` и размещает все на гитхаб. Для этой команды обязательно должен быть установлен модуль `copy-files-from-to`, о котором было выше
3. Готово. Теперь данные на сервере, основное приложение будет брать их оттуда


### Добавление карты на странице контакты 
1. Вставьте верстку куда должна вставляться карта 
2. Внутри блока в котором должна быть карта нужно расместить два дива: первый с id=mapplace для места куда будет вставляться карта `<div id="mapplace"></div>`. Второй - с id=mapdata и атрибутом `data-map-script=[ссылка на карту]`
Примечание: в вестке должны быть заданы размеры для карты. А в ссылке на карту ширина и высота должны быть 100%. Так будет лучше) 

________________________________________________________________________________

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
