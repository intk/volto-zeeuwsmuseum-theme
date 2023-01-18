# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.0.0
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="INTK <cihan@itsnotthatkind.org>" \
      org.label-schema.name="zeeuwsmuseumwebsite-backend" \
      org.label-schema.description="zeeuwsmuseumwebsite backend image." \
      org.label-schema.vendor="INTK"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN <<EOT
    ./bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    ./bin/mxdev -c mx.ini
    ./bin/pip install -r requirements-mxdev.txt
    chown -R plone: /app
EOT
