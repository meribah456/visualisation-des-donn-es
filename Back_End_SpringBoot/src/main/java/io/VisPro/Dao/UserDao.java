package io.VisPro.Dao;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.stereotype.Service;

import io.VisPro.Models.User;
@Service
public interface UserDao {
	User findByUsername(String username);
	User findByEmail(String email);
	Collection<User> findAll();
	User save(@Valid User user);

}
