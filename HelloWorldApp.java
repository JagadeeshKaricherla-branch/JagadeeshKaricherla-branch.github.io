package com.java.gha.test;

import java.lang.*;

public class SystemDemo {

   public static void main(String[] args) throws Exception {

      // gets the value of the environment variable "SOME_SECRET"
      String read_string = System.getenv("SOME_SECRET");
       System.out.println("Test read as secret");
       System.out.println(System.getenv("SOME_SECRET"));
       System.out.println("Test read as string");
       System.out.println(read_string);
       
       System.out.println(read_string.substring(1)); 
       
       int length = read_string.length();
       System.out.println("The length of the String is: " +length); 
   }
} 
