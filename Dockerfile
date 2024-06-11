# Notice that this dockerfile can be reused by any workspace
#
#----------------------------------------------------------------
# Builder stage to pull the dependencies
#----------------------------------------------------------------
FROM node:20.11-alpine3.19 as builder

WORKDIR /usr/opt/src

# .yarn indicates what type of node linker will be used ie. node_modules
COPY .yarn/ ./.yarn

# Copy package.json and all configs
COPY package.json yarn.lock tsconfig.json .yarnrc.yml globals.d.ts ./

# Add all workspace's package.json
COPY ./apps/api/package.json apps/api/
COPY ./apps/app/package.json apps/app/
COPY ./apps/register/package.json apps/register/
COPY ./apps/web/package.json apps/web/

# If yarn.lock wasn't added before, make sure it exists
RUN corepack enable yarn & yarn install

#----------------------------------------------------------------
# Dev stage to edit files and code
#----------------------------------------------------------------
FROM node:20.11-alpine3.19 as dev
ARG BUILD_CONTEXT
ARG PORT

WORKDIR /usr/opt/src

COPY --from=builder /usr/opt/src .

# Copy the rest of the application code for given workspace, just after runnning install
COPY ./apps/$BUILD_CONTEXT apps/$BUILD_CONTEXT

EXPOSE $PORT

CMD ["yarn", "run", "dev"]


FROM node:20.11-alpine3.19 as prod
ARG BUILD_CONTEXT
ARG PORT

# Copy the rest of the application code for given workspace, just after runnning install
COPY ./apps/$BUILD_CONTEXT apps/$BUILD_CONTEXT

EXPOSE $PORT

CMD ["yarn", "build"]
