package com.java.gha.test;

import java.lang.*;

public class SystemDemo {

   public static void main(String[] args) throws Exception {

      // gets the value of the specified environment variable "SOME_SECRET"
      System.out.println("System.getenv("SOME_SECRET") = ");
      System.out.println(System.getenv("SOME_SECRET"));
   }
} 
