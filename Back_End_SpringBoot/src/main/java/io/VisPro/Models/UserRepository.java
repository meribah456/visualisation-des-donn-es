package io.VisPro.Models;

import java.util.Collection;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{
	User findByUsername(String username);
	User findByEmail(String email);
	Collection<User> findAll();

}
