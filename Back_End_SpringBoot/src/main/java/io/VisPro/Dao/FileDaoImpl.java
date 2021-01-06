package io.VisPro.Dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.VisPro.Models.File;
import io.VisPro.Models.FileRepository;
import io.VisPro.Models.User;
@Repository
public class FileDaoImpl implements FileDao{
	@Autowired
	FileRepository fileRepository;
	@Override
	public File findByfilename(String filename) {
		return fileRepository.findByfilename(filename);
	}

	@Override
	public File findByUser(User user) {
		return fileRepository.findByUser(user);
	}

	@Override
	public File findByUserIsNull() {
		return fileRepository.findByUserIsNull();
	}

	@Override
	public Iterable<File> findAllByUser(User user) {
		return fileRepository.findAllByUser(user);
	}

	@Override
	public File save(File file) {
		return fileRepository.save(file);
	}

	@Override
	public void delete(File file) {
		fileRepository.delete(file);
	}

	@Override
	public File findById(long id) {
		Optional<File> help=fileRepository.findById(id);
		if(help.isPresent()) {
			return help.get();	
		}
		return null;
	}


}
