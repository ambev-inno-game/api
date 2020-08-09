-- from: https://www.dbrnd.com/2015/11/postgresql-function-to-truncate-all-tables-created-by-particular-user/
-- Running this snippet creates a function. This function can then be executed
-- in this manner:
--          SELECT as_truncate_tables('pg_user');

CREATE OR REPLACE FUNCTION as_truncate_tables
(InputUserName CHARACTER VARYING) RETURNS void AS $$
DECLARE
	statements CURSOR FOR
	SELECT tablename FROM pg_tables
	WHERE tableowner = InputUserName AND schemaname = 'public';
BEGIN
    FOR stmt IN statements LOOP
	EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';	
    END LOOP;
END;
$$ LANGUAGE plpgsql;