#include <iostream>
#include <sstream>
#include <string>

double evaluateExpression(const std::string &expression)
{
    // This is a very basic and insecure evaluation.
    // For production, you should use a proper parser.
    std::istringstream iss(expression);
    double result;
    iss >> result;

    char operation;
    double operand;
    while (iss >> operation >> operand)
    {
        if (operation == '+')
            result += operand;
        if (operation == '-')
            result -= operand;
        if (operation == '*')
            result *= operand;
        if (operation == '/')
            result /= operand;
    }

    return result;
}

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        std::cerr << "Usage: " << argv[0] << " <expression>" << std::endl;
        return 1;
    }

    std::string expression = argv[1];
    // std::cerr << "expression:" << expression << std::endl;
    double result = evaluateExpression(expression);
    // std::cerr << "result is:" << result << std::endl;
    std::cout << result << std::endl;
    return 0;
}

/*
in backend directory run g++ -o calculator.exe calculator.cpp on terminal
*/