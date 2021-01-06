package io.VisPro.Models;


public class FileWithColumnName{
	private String columnName;
	private byte[] file;


	public FileWithColumnName(byte[] file,String columnName) {
		this.columnName=columnName;
		this.file = file;
		
	}


	public FileWithColumnName() {
		super();
		// TODO Auto-generated constructor stub
	}



	public byte[] getFile() {
		return file;
	}


	public void setFile(byte[] file) {
		this.file = file;
	}


	public String getColumnName() {
		return columnName;
	}


	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}





	
	

}
