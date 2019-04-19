import { join } from 'path'
import { Express } from 'express'

import exphbs from 'express-handlebars'

export const configureViews = (app: Express) => {
    // app.engine('ejs', ejs.renderFile)
    // app.engine('pug', exphbs({defaultLayout: 'main', extname: '.hbs'}))
    app.set('view engine', 'pug')
    app.set('views', join(__dirname, 'views'))

}