package io.VisPro.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import ch.qos.logback.classic.pattern.DateConverter;

@Entity
public class File {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_file;
	@Column
	private String filename;
	@Column
	private byte[] file;
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="id_user", nullable = false)
	private User user;
	
	public File(String filename, byte[] file) {
		super();
		this.filename = filename;
		this.file = file;
	}
	public File(String filename, byte[] file,User user) {
		super();
		this.filename = filename;
		this.file = file;
		this.user = user;
	}
	public File() {
		
	}
	public Long getId_file() {
		return id_file;
	}
	public void setId_file(Long id_file) {
		this.id_file = id_file;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public byte[] getFile() {
		return file;
	}
	public void setFile(byte[] file) {
		this.file = file;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	

}
