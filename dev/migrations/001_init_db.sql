CREATE TABLE as_user (
    id                          SERIAL PRIMARY KEY,
    name                        VARCHAR(255) NOT NULL,
    email                       VARCHAR(255) UNIQUE NOT NULL,
    password                    VARCHAR(255) NOT NULL,
    created_at                  DATE NOT NULL DEFAULT NOW(),
    updated_at                  DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE as_townhouse (
    id                          SERIAL PRIMARY KEY,
    name                        VARCHAR(255) UNIQUE NOT NULL,
    contract_expiration_date    DATE NOT NULL,
    created_at                  DATE NOT NULL DEFAULT NOW(),
    updated_at                  DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE as_resident (
    id                          SERIAL PRIMARY KEY,
    user_id                     INTEGER REFERENCES as_user(id) ON DELETE CASCADE,
    townhouse_id                INTEGER REFERENCES as_townhouse(id) ON DELETE RESTRICT,
    unit_number                 INTEGER NOT NULL,
    created_at                  DATE NOT NULL DEFAULT NOW(),
    updated_at                  DATE NOT NULL DEFAULT NOW()
);
