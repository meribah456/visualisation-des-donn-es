package io.VisPro.Controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.VisPro.Dao.UserDao;
import io.VisPro.Models.User;
import io.VisPro.Models.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	public static long currentUserId=-1;
	private final Logger log = LoggerFactory.getLogger(UserController.class);
	@Autowired
    private UserDao userDao;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public UserController(UserDao userDao, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userDao = userDao;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
    @GetMapping("/users")
    Collection<User> users() {
    	System.out.println("Method executed with results: ");
    	userDao.findAll().forEach(System.out::println);
        return (Collection<User>) userDao.findAll();
    }
  

    @PostMapping("/user")
    ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        log.info("Request to create user: {}", user);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User result = userDao.save(user);
        return ResponseEntity.ok().body(result);
    }
    
    @PostMapping("/editUserInfo")
    ResponseEntity editUser(@RequestParam String username,@RequestParam String newPwd, @RequestParam String oldPwd) {
        log.info("Request to update user: {}", username);
        User userFound = userDao.findByUsername(username);
        if(new BCryptPasswordEncoder().matches(oldPwd, userFound.getPassword())) {
        	userFound.setPassword(bCryptPasswordEncoder.encode(newPwd));
        	userDao.save(userFound);
        	return ResponseEntity.ok().body("Creds updated successfully.");
        }else {
        	return ResponseEntity.ok().body("Old password is wrong.");
        }
    }
    
    
    @PostMapping("/checkUser")
    ResponseEntity<User> checkUser(@Valid @RequestBody User user) {
        User userFound = userDao.findByEmail(user.getEmail());
        System.out.println(userFound.getId_user());
        if(userFound!=null) {
	        if(userFound.getPassword().contentEquals(user.getPassword())) {
	        	currentUserId = userFound.getId_user();
	        	return ResponseEntity.ok().body(userFound);
	        }
        }
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/user/{id}")
    ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        log.info("Request to update user: {}", user);
        User result = userDao.save(user);
        return ResponseEntity.ok().body(result);
    }

}
