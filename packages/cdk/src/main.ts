#!/usr/bin/env node
import { App } from 'cdktf'
import { WebAppStack } from '@lb/cdk/WebAppStack'
import { ProjectStack } from '@lb/cdk/ProjectStack'
import { getBranch } from './utils'

const app = new App()

const branch = getBranch()

new WebAppStack(app, branch)
new ProjectStack(app)

app.synth()
