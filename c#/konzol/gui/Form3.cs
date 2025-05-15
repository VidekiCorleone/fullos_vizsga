using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using konzol;

namespace gui
{
    public partial class Form3 : Form
    {
        ServerConnection connection = new ServerConnection();
        public Form3()
        {
            InitializeComponent();
            label1.Text = "Felhasználónév: ";
            label2.Text = "Jelszó: ";
            button1.Text = "Regisztráció";

            button1.Click += Reg;
        }

        async public void Reg(object s, EventArgs e)
        {
            bool reqResult = await connection.register(textBox1.Text, textBox2.Text);
            if (reqResult == true)
            {
                MessageBox.Show("Sikeres regisztráció!");
            }
            else
            {
                MessageBox.Show("Sikertelen");
            }
        }
    }
}
