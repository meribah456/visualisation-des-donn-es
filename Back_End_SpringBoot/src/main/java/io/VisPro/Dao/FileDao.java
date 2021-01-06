package io.VisPro.Dao;

import org.springframework.stereotype.Service;

import io.VisPro.Models.File;
import io.VisPro.Models.User;
@Service
public interface FileDao {
	File findByfilename(String filename);
	File findByUser(User user);
	File findByUserIsNull();
	File findById(long id);
	Iterable<File> findAllByUser(User user);
	File save(File file);
	void delete(File file);
}
