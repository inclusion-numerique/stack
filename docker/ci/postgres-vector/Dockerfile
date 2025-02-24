# vim:set ft=dockerfile:
from cimg/postgres:14.13

env pgvector_version=0.5.0
run apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    clang \
    libclang-dev \
    llvm \
    llvm-dev \
    libicu-dev \
    libreadline-dev \
    libssl-dev \
    zlib1g-dev \
    && \
    rm -rf /var/lib/apt/lists/* && \
    git clone --depth 1 --branch v${pgvector_version} https://github.com/pgvector/pgvector.git /pgvector && \
    cd /pgvector && \
    make -j $(nproc) && \
    make install && \
    cd / && rm -rf /pgvector && \
    echo "create extension vector;" > /docker-entrypoint-initdb.d/pgvector.sql
