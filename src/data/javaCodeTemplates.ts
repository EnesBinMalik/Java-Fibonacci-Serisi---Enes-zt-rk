export interface JavaCodeTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  filename: string;
}

export const JAVA_TEMPLATES: Record<string, JavaCodeTemplate> = {
  for: {
    id: 'for',
    name: 'Java for Döngüsü (Standart)',
    badge: 'En Çok Tercih Edilen',
    description: 'Belli sayıda adım çalıştırılacağı bilinen durumlarda en temiz ve idiomatic Java çözümüdür.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    filename: 'MainFor.java',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * Java ile Fibonacci Serisi Bulan Program (for Döngüsü)
 * Geliştirici: Enes Öztürk
 * =========================================================
 * Açıklama:
 * Kullanıcıdan alınan eleman sayısına göre Fibonacci serisini
 * ve adım adım toplama işlemlerini for döngüsü ile hesaplar.
 */
public class Main {
    public static void main(String[] args) {
        // Kullanıcıdan veri almak için Scanner nesnesi oluşturuyoruz
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  Java Fibonacci Serisi Hesaplayıcı - Enes Öztürk");
        System.out.println("==================================================");
        System.out.print("Fibonacci serisinin eleman sayısını giriniz: ");
        int n = scanner.nextInt();

        // Eleman sayısı kontrolü
        if (n <= 0) {
            System.out.println("Lütfen 0'dan büyük pozitif bir sayı giriniz!");
            scanner.close();
            return;
        }

        System.out.println("\\n" + n + " Elemanlı Fibonacci Serisi:");

        // Sadece 1 eleman istenirse ilk terim 0'dır
        if (n == 1) {
            System.out.println("0");
            scanner.close();
            return;
        }

        // İlk iki Fibonacci elemanı
        long a = 0;
        long b = 1;

        // İlk iki sayıyı ekrana yazdırıyoruz
        System.out.print(a + " " + b);

        // Kalan (n - 2) adet elemanı for döngüsü ile buluyoruz
        for (int i = 2; i < n; i++) {
            long next = a + b;
            System.out.print(" " + next);

            // Bir sonraki adım için sayıları kaydırıyoruz
            a = b;
            b = next;
        }

        System.out.println("\\n\\nAdım Adım Toplama İşlemleri:");
        // Yeniden başlangıç değerleri ile adımları detaylı yazdıralım
        a = 0;
        b = 1;
        for (int i = 1; i <= n - 2; i++) {
            long next = a + b;
            System.out.println("Adım " + i + ": " + a + " + " + b + " = " + next);
            a = b;
            b = next;
        }

        System.out.println("\\nProgram tamamlandı. (İmza: Enes Öztürk)");
        scanner.close();
    }
}`,
  },

  while: {
    id: 'while',
    name: 'Java while Döngüsü',
    badge: 'Koşul Esaslı',
    description: 'Koşul doğru olduğu sürece devam eden döngü yapısı ile Fibonacci hesabı.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    filename: 'MainWhile.java',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * Java ile Fibonacci Serisi Bulan Program (while Döngüsü)
 * Geliştirici: Enes Öztürk
 * =========================================================
 */
public class MainWhile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Fibonacci serisinin eleman sayısını giriniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Geçersiz eleman sayısı!");
            scanner.close();
            return;
        }

        System.out.println("\\n" + n + " Elemanlı Fibonacci Serisi (while ile):");

        if (n == 1) {
            System.out.println("0");
            scanner.close();
            return;
        }

        long a = 0;
        long b = 1;
        System.out.print(a + " " + b);

        int count = 2; // İlk 2 eleman yazıldı
        while (count < n) {
            long next = a + b;
            System.out.print(" " + next);

            a = b;
            b = next;
            count++;
        }

        System.out.println("\\n\\n[Enes Öztürk - Java while döngüsü örneği]");
        scanner.close();
    }
}`,
  },

  'do-while': {
    id: 'do-while',
    name: 'Java do-while Döngüsü',
    badge: 'En Az 1 Kez Çalışır',
    description: 'Gövdesi en az bir kere çalıştıktan sonra koşulu kontrol eden döngü yapısı ile çözüm.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    filename: 'MainDoWhile.java',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * Java ile Fibonacci Serisi (do-while Döngüsü)
 * Geliştirici: Enes Öztürk
 * =========================================================
 */
public class MainDoWhile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Fibonacci serisinin eleman sayısını giriniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Geçersiz sayı girdiniz!");
            scanner.close();
            return;
        }

        System.out.println("\\n" + n + " Elemanlı Fibonacci Serisi (do-while):");

        if (n == 1) {
            System.out.println("0");
            scanner.close();
            return;
        }

        long a = 0;
        long b = 1;
        System.out.print(a + " " + b);

        int i = 2;
        if (n > 2) {
            do {
                long next = a + b;
                System.out.print(" " + next);

                a = b;
                b = next;
                i++;
            } while (i < n);
        }

        System.out.println("\\n\\n[Enes Öztürk İmzalı Java do-while Örneği]");
        scanner.close();
    }
}`,
  },

  bigint: {
    id: 'bigint',
    name: 'Java BigInteger ile (Sonsuz Basamak)',
    badge: 'Taşma (Overflow) Önleyici',
    description: 'long veri tipinin 93. adımdan sonra aşmasını önlemek için BigInteger sınıfı ile limitsiz hesaplama.',
    timeComplexity: 'O(N * M)',
    spaceComplexity: 'O(1)',
    filename: 'MainBigInteger.java',
    code: `import java.math.BigInteger;
import java.util.Scanner;

/**
 * =========================================================
 * Java ile Büyük Fibonacci Sayıları (BigInteger Sınıfı)
 * Geliştirici: Enes Öztürk
 * =========================================================
 * long sınırı (9.22 * 10^18) aşıldığında sayıların taşmasını
 * engellemek için BigInteger kullanılır. 100+ elemanlar için idealdir.
 */
public class MainBigInteger {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Fibonacci serisinin eleman sayısını giriniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Lütfen pozitif bir sayı giriniz!");
            scanner.close();
            return;
        }

        System.out.println("\\n" + n + " Elemanlı Fibonacci Serisi (BigInteger):");

        if (n == 1) {
            System.out.println("0");
            scanner.close();
            return;
        }

        BigInteger a = BigInteger.ZERO;
        BigInteger b = BigInteger.ONE;

        System.out.print(a + " " + b);

        for (int i = 2; i < n; i++) {
            BigInteger next = a.add(b);
            System.out.print(" " + next);
            a = b;
            b = next;
        }

        System.out.println("\\n\\nEnes Öztürk - Güvenli ve Taşmasız Java Fibonacci Algoritması");
        scanner.close();
    }
}`,
  },
};
