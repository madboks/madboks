# Notice that this dockerfile can be reused by any workspace
# Chosen distribution based on this blog 
# https://snyk.io/blog/choosing-the-best-node-js-docker-image/
FROM node:20-bookworm as build
ARG BUILD_CONTEXT
ARG PORT

WORKDIR /usr/opt/src

# .yarn indicates what type of node linker will be used ie. node_modules
COPY .yarn/ ./.yarn

# Copy package.json and all configs
COPY package.json yarn.lock* tsconfig.json .yarnrc.yml globals.d.ts ./

# Add all workspace's package.json
COPY ./apps/$BUILD_CONTEXT/package.json apps/$BUILD_CONTEXT/

# If yarn.lock wasn't added before, make sure it exists
RUN touch yarn.lock && corepack enable yarn & yarn install

# This executes all build tasks for every workspace
RUN yarn run build

# Copy the rest of the application code for given workspace, just after runnning install
COPY ./apps/$BUILD_CONTEXT apps/$BUILD_CONTEXT

EXPOSE $PORT

# Dockerfile is defined for a dev environment, deployment
# to PROD should change from dev to 
CMD ["yarn", "run", "dev"]



