using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace konzol
{
    internal class Program
    {
        public static ServerConnection connection = new ServerConnection();
        public static List<artData> artData = new List<artData>();
        public static string valami = "run";

        static async Task Main(string[] args)
        {
            await ListReader();
            string commandstring = "run";
            while (commandstring == "run")
            {
                commandstring = await Chooser(commandstring);
            }


        }

        static public async Task<List<artData>> ListReader()
        {
            artData = await connection.getArtwork();


            return artData;
        }

        static async Task<string> Chooser(string command)
        {
            DrawMenu();
            int num = 0;
            string res = Console.ReadLine();
            int.TryParse(res, out num);
            switch (num)
            {
                case 1:
                    Console.Clear();
                    Console.WriteLine("Műalkotások listája");
                    foreach (artData data in artData)
                    {
                        Console.WriteLine($"Műalkotás neve: {data.title}, értéke: {data.value}.");
                    }
                    break;
                case 2:
                    Console.Clear();
                    Console.WriteLine("Adj meg egy számot: ");
                    int szam = 0;
                    string szamString = Console.ReadLine();
                    int.TryParse(szamString, out szam);
                    foreach (artData data in artData)
                    {
                        if (szam < data.value)
                        {
                            Console.WriteLine($"Műalkotás neve: {data.title}, értéke: {data.value}.");
                        }
                    }
                    break;
                case 3:
                    Console.Clear();
                    Console.WriteLine("Műalkotások száma: " + artData.Count());
                    break;
                case 4:
                    Console.Clear();
                    Console.WriteLine("Műalkotások átlagos értéke: " + artData.Average(f => f.value));
                    break;
                case 5:
                    command = "exit";
                    break;
            }
            Console.ReadKey();
            return command;
        }

        static async public void DrawMenu()
        {

            Console.WriteLine("1. Műalkotások listázása");
            Console.WriteLine("2. Adott érték feletti műalkotások listázása");
            Console.WriteLine("3. Műalkotások számának kiírása");
            Console.WriteLine("4. Átlagos műalkotás érték megadása");
            Console.WriteLine("5. Kilépés");
            Console.WriteLine();



        }
    }
}
