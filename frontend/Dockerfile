# syntax=docker/dockerfile:1
FROM node:16-slim as base
FROM base as builder

RUN <<EOF
    apt-get update
    buildDeps="python3 build-essential git ca-certificates"
    apt-get install -y --no-install-recommends $buildDeps
    rm -rf /var/lib/apt/lists/*
EOF

COPY --chown=node . /build/
RUN corepack enable

USER node
WORKDIR /build
RUN <<EOF
    make install
    yarn build
EOF

FROM base

LABEL maintainer="INTK <cihan@itsnotthatkind.org>" \
    org.label-schema.name="zeeuwsmuseumproject-frontend" \
    org.label-schema.description="ZeeuwsMuseumProject frontend image." \
    org.label-schema.vendor="INTK"

RUN <<EOF
    apt-get update
    buildDeps="busybox"
    apt-get install -y --no-install-recommends $buildDeps
    busybox --install -s
    rm -rf /var/lib/apt/lists/*
EOF


USER node
COPY --from=builder /build/ /app/

WORKDIR /app
EXPOSE 3000
CMD ["yarn", "start:prod"]
