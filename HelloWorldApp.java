package com.java.gha.test;

import java.lang.*;

public class SystemDemo {

   public static void main(String[] args) throws Exception {

      // gets the value of the specified environment variable "PATH"
      System.out.println("System.getenv("PATH") = ");
      System.out.println(System.getenv("PATH"));
   }
} 
