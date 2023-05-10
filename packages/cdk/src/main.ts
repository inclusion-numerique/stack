#!/usr/bin/env node
import { App } from 'cdktf'
import { ProjectStack } from '@app/cdk/ProjectStack'
import { WebAppStack } from '@app/cdk/WebAppStack'
import { getBranch } from './utils'

const app = new App()

const branch = getBranch()

new WebAppStack(app, branch)
new ProjectStack(app)

app.synth()
