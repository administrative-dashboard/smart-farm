DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'farm') THEN
        CREATE USER farm WITH PASSWORD '123';
        ALTER USER farm CREATEDB;
    END IF;
END $$;

CREATE DATABASE smart_farm;
GRANT ALL PRIVILEGES ON DATABASE smart_farm TO farm;
