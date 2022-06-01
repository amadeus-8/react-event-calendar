#!/usr/bin/env node
const inquirer = require('inquirer')
const { execSync } = require('child_process')
const { readdirSync } = require('fs')

const targetFolder = './src/pages'

const directories = readdirSync(targetFolder)

const questions = [
    {
        type: 'list',
        name: 'page',
        message: 'Choose page to compile',
        choices: directories,
    },
]

inquirer.prompt(questions).then(({ page }) => {
    const options = {
        stdio: 'inherit',
    }
    execSync(`npm run start -- --env page=${page}`, options)
})
