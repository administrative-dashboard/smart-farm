# Use an official PostgreSQL image as the base
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=smart_farm
ENV POSTGRES_USER=farm
ENV POSTGRES_PASSWORD=123


# Copy SQL scripts, migrations, models, seeders, etc., if necessary
# COPY migrations /migrations
# COPY models /models
# COPY seeders /seeders

# Run SQL scripts to initialize database (if needed)
# Example: 
# COPY init.sql /docker-entrypoint-initdb.d/
# This will run init.sql when the container starts

# Expose the PostgreSQL port
EXPOSE 5432

# Define the command to start the PostgreSQL server (no need to specify, handled by base image)