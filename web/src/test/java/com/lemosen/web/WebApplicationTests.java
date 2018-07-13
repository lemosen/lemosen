package com.lemosen.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;

//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class WebApplicationTests {
//
//    @Test
//    public void contextLoads() {
//    }
//
//}

public class WebApplicationTests {
    public static void main(String[] args) {

        long startTime = System.currentTimeMillis();    //获取开始时间

        String[] a = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "s", "y", "z", "A", "B", "C", "D", "E", "F"};
        String[] print = new String[a.length];
        int[] b = new int[a.length];

        for (int i = 0; i < a.length; i++) {
            print[i] = "0";
            b[i] = 0;
        }

        System.out.println(Arrays.toString(print));

        while (true) {
            for (int k = b.length - 1; k > 0; k--) {
                if (b[k] < a.length - 1) {
                    b[k]++;
                    for (int j = a.length - 1; j >= 0; j--) {
                        print[j] = a[b[j]];
                    }
                    StringBuilder aa = new StringBuilder();
                    boolean flag = false;
                    for (String string : print) {
                        if (!string.equals("0") || flag) {
                            flag = !flag;
                            aa.append(string);
                        }
                    }
                    System.out.println(aa);
                    if (aa.toString().equals("abcde")) {
                        long endTime = System.currentTimeMillis();    //获取结束时间
                        System.out.println("程序运行时间：" + (endTime - startTime) + "ms");
                        System.out.println("------------");
                        return;
                    }
                    break;
                } else if (b[k] >= a.length - 1) {
                    b[k] -= a.length - 1;
                    b[k - 1]++;
                    for (int l = 1; l < a.length - 1; l++) {
                        if (b[k - l] == a.length) {
                            b[k - l] = 0;
                            b[k - l - 1]++;
                        }
                    }

                    k++;
                }
            }
        }

    }
}

