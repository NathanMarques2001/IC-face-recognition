--  O banco precisa estar criado para execução deste arquivo
-- O nome do banco deve ser ic_data_science

-- Criação das tabelas
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS facial_vectors (
  id SERIAL PRIMARY KEY,
  user_id INT,
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (id),
  face_vector FLOAT[] NOT NULL
);

-- Criação da função para cálculo da distância euclidiana
CREATE OR REPLACE FUNCTION calcular_distancia_euclidiana(user_vector FLOAT[])
RETURNS TABLE (id INT, euclidean_distance FLOAT)
LANGUAGE plpgsql
AS $$ 
DECLARE
	current_register RECORD;
	current_user_id INT;
	square_sum FLOAT;
	diff FLOAT;
BEGIN
DROP TABLE IF EXISTS temp_table;
CREATE TEMPORARY TABLE IF NOT EXISTS temp_table(id INT, euclidean_distance FLOAT);
FOR current_register IN SELECT * FROM facial_vectors LOOP
	square_sum := 0;
	diff := 0;
  	FOR i IN 1..array_length(user_vector, 1) LOOP
		diff := user_vector[i] - current_register.face_vector[i];
		square_sum := square_sum + diff * diff;
	END LOOP;
	current_user_id := (SELECT u.id FROM users u WHERE current_register.user_id = u.id);
	INSERT INTO temp_table (id, euclidean_distance) VALUES (current_user_id, sqrt(square_sum));
END LOOP;
RETURN QUERY SELECT tf.id, tf.euclidean_distance from temp_table tf
ORDER BY tf.euclidean_distance LIMIT 1;
END $$;