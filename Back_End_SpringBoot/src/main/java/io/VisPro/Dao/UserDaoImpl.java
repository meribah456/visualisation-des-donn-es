package io.VisPro.Dao;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.VisPro.Models.User;
import io.VisPro.Models.UserRepository;
@Repository
public class UserDaoImpl implements UserDao {
	@Autowired
	UserRepository userRepository;
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public Collection<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User save(@Valid User user) {
		return userRepository.save(user);
	}



}
